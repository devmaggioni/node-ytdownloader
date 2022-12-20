import yts from "yt-search";

export const videoDetails = (url) => new Promise((resolve, reject) => {
	try {
    
		let videoId = url.includes("watch") ?
			url.split("v=")[1]
			: url.includes("shorts") ? 
				url.split("shorts/")[1]
				: url.split("youtu.be/")[1];
    
		if (videoId.includes("?")) videoId.split("?")[0];
    
		yts({
			videoId
		})
			.then(resp=>{
				resolve(resp);
			})
			.catch(err=>{
				reject(err);
			});
    
	} catch(err) {
		reject(err);
	}
});

export const searchVideo = (query) => new Promise((resolve, reject)=>{
	try {
    
		yts({query})
			.then(resp=>{
				if (resp.videos.length === 0) resolve([]);
				resolve(resp.videos);
			})
			.catch(err=>{
				reject(err);
			});
      
	} catch(err) {
		reject(err);
	}
});

export const searchAll = (query) => new Promise((resolve, reject)=>{
	try {
    
		yts({query})
			.then(resp=>{
				if (resp.videos.length === 0) resolve([]);
				resolve(resp);
			})
			.catch(err=>{
				reject(err);
			});
      
	} catch(err) {
		reject(err);
	}
});

export const searchChannel = (query) => new Promise((resolve, reject) => {
	try {
    
		yts({query})
			.then(resp=>{
				if (resp.channels.length === 0) resolve([]);
				resolve(resp.channels);
			})
			.catch(err=>{
				reject(err);
			});
    
	} catch(err) {
		reject(err);
	}
});