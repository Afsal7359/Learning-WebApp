import React, { useRef, useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './swiper.css';
import { Navigation, Pagination } from 'swiper/modules';
import { GetAllCourse, SearchCourse } from '../../Api/Course';
import { GetCategory } from '../../Api/Category';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Courseintro from '../Course/Courseintro';
import { Link } from 'react-router-dom';
import bannerimg7 from '../../assets/images/shapes/category-bg-1.jpg'
import logo2 from '../../assets/images/logo-vinjan.png'
import proficon from '../../assets/images/profileimg.png'
import banner1 from '../../assets/images/gallery/fg-1.jpg'
import profileimg from '../../assets/images/gallery/fg-5.jpg'
import Search from '../Course/Search';
import { GetAllCarousel } from '../../Api/Carousel';

function Home() {

  const [CourseData,setCourseData]=useState([])
  const [CategoryData,setCategoryData]=useState([]) 
  const [isloading,setIsLoading]=useState(false)

  const [courseintro,setCourseIntro]=useState(false)
  const [courseitem,setCourseItem]=useState([])
  const [PageUI,setPageUI]=useState(true)
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [search ,setSearch]=useState(false)
  const [banner,setBanner]=useState([])
  const [searchbar,setsearchbar]=useState(true)

  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await SearchCourse(searchQuery)
      setPageUI(false)
      if(response.success){
        setSearch(true)
        setResults(response.data)
      }else{
        console.log(response,"err");
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  console.log(results,"sesarch result");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        fetchSearchResults(query);
      }
      setIsTyping(false);
    }, 500);

    // Cleanup function to cancel the timeout if the component unmounts or the effect re-runs
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setIsTyping(true);
    if(query){
      setSearch(false);
      setPageUI(true)
    }
  };
  
  const BannerDataFetch=async()=>{
    setIsLoading(true)
    try {
      if(banner.length ===0){
        const response = await GetAllCarousel()
        if(response.success){
          setBanner(response.data)
          setIsLoading(false)
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  console.log(banner,"banner");

  const CourseDatafetch =async()=>
    {
      try {
        
            const Category = await GetCategory();
            if(Category.success===true){
              console.log(Category,"success");
              setCategoryData(Category.data)
            }else{
              console.log(Category,"error");
            }
            const response = await GetAllCourse();
            if(response.success=== true){
              console.log(response,"success");
               setCourseData(response.courses)
              
            }else{
              console.log(response,"error");
            }
          setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(()=>
    {
      CourseDatafetch();
      BannerDataFetch();
    },[])
    const handleCourseClick=(data)=>{
      try {
        console.log(data);
        setCourseItem(data)
        setCourseIntro(true)
        setPageUI(false)
        setSearch(false)
        setsearchbar(false)
        set
      } catch (error) {
        
      }
    }
   
  return (
    <>
        <header className="main-header" >
          <nav className="main-menu" style={{ backgroundColor: "#e0e8f6" }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="main-menu__logo">
                <Link >
                  <img
                    src={logo2}
                    width={410}
                    height={60}
                    alt="Eduact"
                  />
                </Link>
              </div>
              <div className="main-menu__right" style={{ display: 'flex', alignItems: 'center' }}>
               {searchbar&& <div className="search-popup__contents">
                  <input
                    className='form-control'
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder='Search for anything'
                    style={{ borderRadius: "25px", height: "45px", width: "320px" }}
                  />
                </div>}
                <div className="main-menu__login">
                  <Link to="/profile">
                    <img src={proficon} alt="" height={45} />
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
        {PageUI&&<>{isloading ? (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    ):<div>
  
      <Swiper   loop={true} navigation={true} modules={[Navigation]} className="mySwiper mb-5" id="home"  >
        {banner.map((item,index)=>(
          <SwiperSlide key={index}>
          <img src={item.carousel_image} alt="" className='bannerimg' />
        </SwiperSlide>
        ))}
        
      
      </Swiper>
      {CourseData.length !==0 ?CourseData.map((item,index)=>(
        <section
      className='mb-5 mt-5'
      style={{ backgroundImage: bannerimg7 }}
    >
      <div className="container" style={{borderBottom:"0.5px solid #d9d9d9"}} >
        <div className="section-title ">
          <h5 className="section-title__tagline">
             {/* {item.name} */}
             {/* Category */}
           
          </h5>
          <h2 className="section-title__title mt-4">{item.name}</h2>
        </div>
        
        <Swiper
         navigation={true} modules={[Navigation]} 
  slidesPerView={3}
  spaceBetween={30}
  loop={true}
  pagination={{
    clickable: true,
  }}
 
  breakpoints={{
    640: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 60,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  }}
  className="mySwiper"
>
  {item.data
    ? item.data.map((data, index) => (
      <SwiperSlide key={index} >
        <div className="course-card" >
          <div>
            <img
              src={data.thumbnail}
              alt="eduact"
              className="course-image"
              style={{ borderRadius: "20px" }}
            />
          </div>
      
          <div className="course-two__content">
          <div className='container' style={{ display: 'flex', alignItems: 'center', borderRadius: "12px" }}>
  <div>
    <img src={data.tutor?.profile_image || profileimg} alt="" style={{ height: 45, width: 45, border: "0.1px solid black", borderRadius: '50%' }} />&nbsp;&nbsp;
  </div>
  <div >
    <h5 style={{ fontWeight: "bolder", fontFamily: "sans-serif", fontSize: 25, width:"max-content" }}>{data.name}</h5>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <i><p style={{ fontSize: "14px", margin: 0 }}>Duration: {data.duration} &nbsp; </p></i>
      <i><p style={{ fontSize: "14px", margin: 0, marginLeft: 'auto' }}>Tutor: {data.tutor?.username || ""}</p></i>
    </div>
  </div>
</div>


            <button className='btn btn-success' style={{ width: "100%" }} onClick={() => handleCourseClick(data)}>Enroll</button>
          </div>
        </div>
      </SwiperSlide>
      
    ))
    : ""}
  {/* Navigation arrows */}

</Swiper>
      </div>
    </section>
      )):(
        <div className="loader-container"><div className="loader"></div></div>
      )}

    <div className="search-popup">
      <div className="search-popup__overlay search-toggler" />
      {/* /.search-popup__overlay */}
      <div className="search-popup__content">
        <form
          role="search"
          method="get"
          className="search-popup__form"
          action="#"
        >
          <input type="text" id="search" placeholder="Search Here..." />
          <button type="submit" className="eduact-btn">
            <span className="eduact-btn__curve" />
            <i className="icon-Search" />
          </button>
        </form>
      </div>
      {/* /.search-popup__content */}
    </div>
 

    </div>}</>}
    {courseintro && <Courseintro data={courseitem} setPage={setPageUI} setIntroPage={setCourseIntro} setsearchbar={setsearchbar}/>}
      {search&& <Search data={results} handleCourseClick={handleCourseClick}/>}
    </>
  )
}
const containerStyle = {
  display: 'flex',

};

const itemStyle = {
  flex: '1',
  display: 'flex',
  marginLeft:"20px"
};
export default Home