import type {Song} from '../../types/song'
import styles from './SearchResultCard.module.css'

export default function SearchResultCard({song}: {song: Song}) {
  const durationInMinutes = Math.floor(song.duration_ms / 60000)
  
  return <div className={styles.searchResultCard}>
    <h2 className={styles.searchResultCardSongName}>{song.name}</h2>
    <h3>Artists: {song.artists}</h3>
    <p>Duration: {durationInMinutes} Minutes</p>
  </div>
}