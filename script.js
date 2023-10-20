//Fetch the components
const lightButton=document.querySelector("[btnLight]");
const darkButton=document.querySelector("[btnDark]");
const searchForm=document.querySelector(".searchForm");
const searchBar=document.querySelector("[search]");
const searchBtn=document.querySelector("[searchBtn]");
const dp=document.querySelector("[displayPic]");
const user=document.querySelector("[userName]");
const ghLink=document.querySelector("[userLink]");
const joinDate=document.querySelector("[joinDate]");
const desc=document.querySelector("[desc]");
const repoData=document.querySelector("[repoData]");
const followData=document.querySelector("[followData]");
const followingData=document.querySelector("[followingData]");
const locn=document.querySelector("[locationData]");
const bd=document.querySelector("[bioData]");
const tLink=document.querySelector("[twitterLink]");
const cd=document.querySelector("[companyData]");


//Default variables
const initName="ash956901";
getUser(initName);

//eventListeners
searchForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  let userName=searchBar.value;
  if(userName==="")
    return;
  else  
    getUser(userName);
});

darkButton.addEventListener("click",()=>{
  darkButton.classList.remove("active");
  lightButton.classList.add("active");


  let mainElement=document.querySelector(":root");
  mainElement.style.cssText=`
  --lm-bg: #141D2F;
  --lm-bg-content:#1E2A47;
  --lm-text: white;
  --lm-text-alt: white;
  --lm-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.2);
  --lm-shadow-inactive: 0px 16px 30px -10px rgba(0, 0, 0, 0.2);
  --lm-icon-bg: brightness(1000%);
  --btn: #0079ff;
  --btn-hover: #60abff; `

  //Links to White
  searchBar.style.backgroundColor="#1E2A47";
  tLink.style.color="white";
  bd.style.color="white";
  //Numbers to White
  repoData.style.color="white";
  followData.style.color="white";
  followingData.style.color="white";

  searchBar.style.color="white";
  
});

lightButton.addEventListener("click",()=>{
  lightButton.classList.remove("active");
  darkButton.classList.add("active");


  let mainElement=document.querySelector(":root");
  mainElement.style.cssText=`
  --lm-bg: #f6f8ff;
  --lm-bg-content: #fefefe;
  --lm-text: #4b6a9b;
  --lm-text-alt: #2b3442;
  --lm-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.2);
  --lm-shadow-inactive: 0px 16px 30px -10px rgba(0, 0, 0, 0.2);
  --lm-icon-bg: brightness(100%);
  --btn: #0079ff;
  --btn-hover: #60abff; `

  //Links to White
  searchBar.style.backgroundColor="white";
  tLink.style.color="blue";
  bd.style.color="blue";
  //Numbers to White
  repoData.style.color="black";
  followData.style.color="black";
  followingData.style.color="black";
  searchBar.style.color="black";
  
});

//functions 

async function getUser(username){
  try{
    const response=await fetch(`https://api.github.com/users/${username}`);
    const data=await response.json();
    renderData(data);
  }
 
  catch(e){
   alert("No user found with the entered username");
  
  }
}

function renderData(data){
  user.innerText=data?.name;
  ghLink.innerText=`@`+`${data?.login}`;
  ghLink.href=data?.html_url;
  desc.innerText=data?.bio;
  repoData.innerText=data?.public_repos;
  followData.innerText=data?.followers;
  followingData.innerText=data?.following;
  locn.innerText=data?.location;
  tLink.innerText=data?.twitter_username;
  tLink.href=`https://www.twitter.com/${data?.twitter_username}`;
  cd.innerText=data?.company;
  bd.innerText=data?.blog;
  bd.href=`${data?.blog}`;
  dp.src=data?.avatar_url;

  //Not Available Management
  if(tLink.innerText===""){
    tLink.innerText=`Not Available`;
    // tLink.href=""; 
   }
  if(cd.innerText===""){
    cd.innerText=`Not Available`;
  }
  if(bd.innerText===""){
    bd.innerText=`Not Available`;
    // bd.href="";
  }
  if(locn.innerText===""){
    locn.innerText=`Not Available`;
  }
  if(desc.innerText===""){
    desc.innerText=`This profile has no bio`;
  }

  if(user.innerText===""){
    user.innerText=`Name not available`;
  }


  //Date 
  let tempDate=data?.created_at.split("T");
  let tempDate2=tempDate[0].split("-");
  let month=tempDate2[1];

  let mon=whichMonth(month);
  let year=tempDate2[0];
  let day=tempDate2[2];

  joinDate.innerText=` ${day}`+` ${mon}`+` ${year}`;

}


function whichMonth(month){
  let arr=["Jan","Feb","March","April","May","June","July","August","Sep","Oct","Nov","Dec"];
  return arr[month-1];
}
