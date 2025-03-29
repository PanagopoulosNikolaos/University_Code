import yt_dlp
import os

def download_audio_from_urls(file_path):
    # Ensure the downloads directory exists
    os.makedirs('downloads', exist_ok=True)

    # Read URLs from the file
    with open(file_path, 'r') as file:
        urls = file.readlines()
    
    # Configuration for yt-dlp
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': 'downloads/%(title)s.%(ext)s',
        'noplaylist': True,
        'quiet': True,
    }

    # Download each URL
    for url in urls:
        url = url.strip()
        if url:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                try:
                    ydl.download([url])
                    print(f"Downloaded audio from: {url}")
                except Exception as e:
                    print(f"Failed to download {url}: {e}")

# Path to your text file containing YouTube URLs
file_path = 'links.txt'
download_audio_from_urls(file_path)
