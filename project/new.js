// Function to get URL parameters
    function getUrlParameter(n) {
      n = n.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + n + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
// Function to fetch img from the API
async function getimg(id) {
  try {
     const response = await fetch(`https://api.github.com/repos/Fastfoodbytest/appifyway_data/contents/project/${id}/screenshot/`);
    const data = await response.json();
    
 
  data.forEach(file => {
    var img = document.createElement('img');
    img.src = file.download_url;
    img.alt = 'screenshot';
    img.loading = 'lazy';
    img.onclick = function () {
     //screenshot on 
     alert(file.name)
    }
   document.getElementById('screenshot').appendChild(img);

  });
    
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
//Function to fetch data from a text file
async function fetchData(id) {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/Fastfoodbytest/appifyway_data/main/project/${id}/app_info.json`); // Replace with your GitHub username and repository name
    const data = await response.json();
   
    document.getElementById('icon').src=`https://raw.githubusercontent.com/Fastfoodbytest/appifyway_data/main/project/${id}/icon.png`
    
    return data;
  } catch (error) {
    
 window.location.href = "/error" 
    console.error('Error fetching data:', error);
    return null ;
  }
}

// Main function to get and log data
async function get_app_info(id) {
  const jsonData = await fetchData(id);
  if (jsonData) {
    const { name, version, update_date,last_update, size, what_new, about, tag, yt } = jsonData;
   
   //name
    document.getElementById('name').innerText= name;
   
    //size
    document.getElementById('size').innerText= size;
    //yt
   
    if (yt) {
document.getElementById('video').style.display="inline-block"
    document.getElementById('video').src= `https://www.youtube.com/embed/${yt}`;
    }
    //new
     const wh_new = what_new.split(',')
     wh_new.forEach(function(i) {
       i= i.toUpperCase()
    var p = document.createElement("p");
    p.textContent = `• ${i} 
    
    `;
           document.getElementById('whats-new').appendChild(p)
     })
     //package_name
  var p = document.createElement("p");
  p.textContent = `Package Name : ${about.package_name} `;
  document.getElementById('about').appendChild(p)
  //version
  var p = document.createElement("p");
  p.textContent = `Latest Version : v${version}`;
  document.getElementById('about').appendChild(p)
  //update
  var p = document.createElement("p");
  p.textContent = `Last update : ${last_update}`;
  document.getElementById('about').appendChild(p)
  //size
  var p = document.createElement("p");
  p.textContent = `download size : ${size}`;
  document.getElementById('about').appendChild(p)
  //update date
    var p = document.createElement("p");
    p.textContent = `Published on : ${update_date}`;
    document.getElementById('about').appendChild(p)
    //info
  var p = document.createElement("p");
  p.innerHTML=`Source: <a href=${about.info}>see more..</a>`
  document.getElementById('about').appendChild(p)
  
  } else {
    
    console.log('Failed to fetch data.');
  }
}

 // Call the main function

var appid = getUrlParameter('id');

if (appid) {
  getimg(appid);
  get_app_info(appid)
}
function download() {
  
  window.location.href = `https://raw.githubusercontent.com/Fastfoodbytest/appifyway_data/main/project/${appid}/base.apk`;

   
   
}
    