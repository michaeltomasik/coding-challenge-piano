import gql from "graphql-tag";

export default gql`
  mutation addSong($title: String, $keysPlayed: [NoteInput]) {
    addSong(title: $title, keysPlayed: $keysPlayed){
      title
      keysPlayed {
        note
        time
      }
    }
  }
`