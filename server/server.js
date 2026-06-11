const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use("/songs", express.static("songs"));
app.use("/covers", express.static("covers"));

app.get("/songslist", (req, res) => {
  const songs = [
    {
      id: 1,
      title: "Bairan",
      artist: "Bairan",
      image: "http://localhost:5000/covers/Bairan.jpg",
      audio: "http://localhost:5000/songs/Bairan - Bairan (128 kbps).mp3",
    },
    {
      id: 2,
      title: "Buddhu Sa Mann",
      artist: "Kapoor & Sons",
      image: "http://localhost:5000/covers/buddhu-sa-mann.jpg",
      audio: "http://localhost:5000/songs/buddhu-sa-mann.mp3",
    },
    {
      id: 3,
      title: "Deewana Kar Raha Hai",
      artist: "Raaz 3",
      image: "http://localhost:5000/covers/raaz-3.jpg",
      audio: "http://localhost:5000/songs/Deewana Kar Raha Hai.mp3",
    },
    {
      id: 4,
      title: "Gehra Hua",
      artist: "Dhurandhar",
      image: "http://localhost:5000/covers/gehra-hua-dhurandhar.jpg",
      audio: "http://localhost:5000/songs/Gehra Hua - Dhurandhar (128 kbps).mp3",
    },
    {
      id: 5,
      title: "Ghana Kasoota",
      artist: "Ghana Kasoota",
      image: "http://localhost:5000/covers/Ghana-Kasoota.jpg",
      audio: "http://localhost:5000/songs/Ghana Kasoota - Ghana Kasoota (128 kbps).mp3",
    },
    {
      id: 6,
      title: "Hai Jawani Toh Ishq Hona Hai",
      artist: "Bollywood",
      image: "http://localhost:5000/covers/Hai Jawani Toh Ishq Hona Hai.jpg",
      audio: "http://localhost:5000/songs/Hai Jawani Toh Ishq Hona Hai .mp3",
    },
    {
      id: 7,
      title: "Har Har Gange",
      artist: "Batti Gul Meter Chalu",
      image: "http://localhost:5000/covers/Batti-Gul-Meter-Chalu.jpg",
      audio: "http://localhost:5000/songs/Har Har Gange - Batti Gul Meter Chalu (128 kbps).mp3",
    },
    {
      id: 8,
      title: "Khat",
      artist: "Khat",
      image: "http://localhost:5000/covers/Khat.jpg",
      audio: "http://localhost:5000/songs/Khat - Khat (128 kbps).mp3",
    },
    {
      id: 9,
      title: "Let's Nacho",
      artist: "Kapoor & Sons",
      image: "http://localhost:5000/covers/let's-nacho.jpg",
      audio: "http://localhost:5000/songs/Let's Nacho - Kapoor & Sons (Since 1921) (128 kbps).mp3",
    },
    {
      id: 10,
      title: "Lutt Le Gaya",
      artist: "Dhurandhar",
      image: "http://localhost:5000/covers/lutt-le-gaya.jpg",
      audio: "http://localhost:5000/songs/Lutt Le Gaya - Dhurandhar (128 kbps).mp3",
    },
    {
      id: 11,
      title: "Mafia",
      artist: "Mafia",
      image: "http://localhost:5000/covers/Mafia.jpg",
      audio: "http://localhost:5000/songs/Mafia - Mafia (128 kbps).mp3",
    },
    {
      id: 12,
      title: "Mere Humnava",
      artist: "Bollywood",
      image: "http://localhost:5000/covers/mere-Humnava.jpg",
      audio: "http://localhost:5000/songs/Mere-Humnava.mp3",
    },
    {
      id: 13,
      title: "Move – Yeh Ishq Ishq",
      artist: "Dhurandhar",
      image: "http://localhost:5000/covers/yeh-ishq-ishq.jpg",
      audio: "http://localhost:5000/songs/Move - Yeh Ishq Ishq - Dhurandhar (128 kbps).mp3",
    },
    {
      id: 14,
      title: "Naal Nachna",
      artist: "Dhurandhar",
      image: "http://localhost:5000/covers/naal-nachna.jpg",
      audio: "http://localhost:5000/songs/Naal Nachna - Dhurandhar (128 kbps).mp3",
    },
    {
      id: 15,
      title: "Ramba Ho",
      artist: "Dhurandhar",
      image: "http://localhost:5000/covers/ramba-ho.jpg",
      audio: "http://localhost:5000/songs/Ramba Ho - Dhurandhar (128 kbps).mp3",
    },
    {
      id: 16,
      title: "Saathi Rey",
      artist: "Bollywood",
      image: "http://localhost:5000/covers/saathi-rey.jpg",
      audio: "http://localhost:5000/songs/Saathi Rey.mp3",
    },
    {
      id: 17,
      title: "Shararat",
      artist: "Dhurandhar",
      image: "http://localhost:5000/covers/shararat.jpg",
      audio: "http://localhost:5000/songs/Shararat - Dhurandhar (128 kbps).mp3",
    },
    {
      id: 18,
      title: "Sheesha",
      artist: "Bollywood",
      image: "http://localhost:5000/covers/Sheesha-Aakhya-Mai-Aakh-Ghali-Jo-Beran.jpg",
      audio: "http://localhost:5000/songs/Sheesha.mp3",
    },
    {
      id: 19,
      title: "Tu Mileya",
      artist: "Tu Mileya",
      image: "http://localhost:5000/covers/Tu-Mileya.jpg",
      audio: "http://localhost:5000/songs/Tu Mileya - Tu Mileya (128 kbps).mp3",
    },
  ];

  res.json(songs);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});