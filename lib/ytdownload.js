import fs from "fs";
import ytdl from "ytdl-core";

export function ytDownload({url, name, path, quality}){
	return new Promise((resolve, reject)=>{
		try {
    
			if (!path) path = "";
			if (!quality) quality = "lowest";
			if (quality === "360p") quality = "134";
			if (quality === "480p") quality = "135";
			if (quality === "720p") quality = "136";
			if (quality === "1080p") quality = "137";
    
			if (!name) name = "yt-video.mp4";
			ytdl(url, { quality })
				.pipe(fs.createWriteStream(path + name))
				.on("finish", function(err){
					if (err) reject(err);
					resolve(true);
				});

		} catch(err) {
			reject(err);
		}
	});
}

export function ytDownloadMp3({url, name, path}){
	return new Promise((resolve, reject)=>{
		try {
    
			if (!path) path = "";
			if (!name) name = "yt-music.mp3";
			ytdl(url, { filter: "audioonly" })
				.pipe(fs.createWriteStream(path + name))
				.on("finish", function(err){
					if (err) reject(err);
					resolve(true);
				});
    
		} catch(err) {
			reject(err);
		}
	});
}