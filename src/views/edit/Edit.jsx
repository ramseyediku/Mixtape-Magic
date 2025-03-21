import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import styles from '../../components/ui/main/main.module.css'
import PlaylistNav from '../../components/ui/playlistNav/PlaylistNav'
import formStyles from '../../components/ui/form/form.module.css'
import { fetchPlaylistById } from '../../slices/singlePlaylistSlice'
import { updatePlaylist } from '../../slices/myPlaylistSlice'

const Edit = () => {
    const {
        item: playlist,
        status,
        error,
    } = useSelector((state) => state.singlePlaylist)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        coverImage: '',
        songs: [],
    })

    useEffect(() => {
        if (id) dispatch(fetchPlaylistById(id))
    }, [dispatch, id])

    useEffect(() => {
        if (playlist) {
            setFormData({
                name: playlist.name || '',
                description: playlist.description || '',
                coverImage: playlist.coverImage || '',
                songs: playlist.songs || [],
            })
        }
    }, [playlist])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePlaylist({ playlistId: id, updatedData: formData }))
            .then(() => {
                navigate(`/playlist/${id}`)
            })
            .catch((error) => console.error('Error updating playlist:', error))
    }

    if (status === 'loading') return <p>Loading...</p>
    if (status === 'failed') return <p>Error: {error}</p>

    return (
        <form className={formStyles.form} onSubmit={handleSubmit}>
            <legend className={formStyles.form__legend}>Edit Playlist</legend>

            <div className={formStyles.form__group}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={formStyles.form__group}>
                <label>Description</label>
                <textarea name="description" onChange={handleChange} required />
            </div>

            <div className={formStyles.form__group}>
                <label>Cover Image URL</label>
                <input
                    type="text"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Save Changes</button>
        </form>
    )
}

export default Edit
