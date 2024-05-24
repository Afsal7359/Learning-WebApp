import React, { useEffect, useState } from 'react'
import { GetAllCourse } from '../../Api/Course';
import { GetCategory } from '../../Api/Category';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Courseintro from '../Course/Courseintro';
import { Link } from 'react-router-dom';
import bannerimg from '../../assets/images/shapes/banner-bg-1.png'
import bannerimg2 from '../../assets/images/shapes/banner-1-shape-1.png'
import bannerimg3 from '../../assets/images/resources/banner-1-1.png'
import bannerimg4 from '../../assets/images/shapes/banner-cap.png'
import bannerimg5 from '../../assets/images/shapes/banner-star.png'
import bannerimg6 from '../../assets/images/shapes/banner-map.png'
import bannerimg7 from '../../assets/images/shapes/category-bg-1.jpg'


function Home() {

  const [CourseData,setCourseData]=useState([])
  const [CategoryData,setCategoryData]=useState([]) 
  const [isloading,setIsLoading]=useState(false)

  const [courseintro,setCourseIntro]=useState(false)
  const [courseitem,setCourseItem]=useState([])
  const [PageUI,setPageUI]=useState(true)

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 3,
    margin: '0 5em', // Space between items
    loop: true,
    autoplay: true,
    autoplaySpeed: 9000, // Adjust autoplay speed if needed
    swipeToSlide: true, // Allow swiping to slide
    rtl: true, // Set the slider to move from right to left
    responsive: [
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true, // Show arrows for navigation
          dots: false,
          centerMode: false, // Disable center mode for small screens
          rtl: true // Enable right-to-left direction for small screens
        }
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
          dots: false,
          rtl: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
          dots: false,
          rtl: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
          dots: false,
          rtl: true
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
          dots: false,
          rtl: true
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
          dots: false,
          rtl: true
        }
      }
    ]
  };
  
  

  const CourseDatafetch =async()=>
    {
      try {
        if(isloading)
          {
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
          }
          setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>
    {
      CourseDatafetch();
    },[])
    const handleCourseClick=(data)=>{
      try {
        console.log(data);
        setCourseItem(data)
        setCourseIntro(true)
        setPageUI(false)
        set
      } catch (error) {
        
      }
    }
   
  return (
    <>{PageUI&&<>{isloading ? (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    ):<div>
        <header className="main-header">
            <nav className="main-menu">
            <div className="container">
                <div className="main-menu__logo">
                <Link to="#">
                    <img
                    src="/src/assets/images/logo-light.png"
                    width={183}
                    height={48}
                    alt="Eduact"
                    />
                </Link>
                </div>
                {/* /.main-menu__logo */}
                <div className="main-menu__nav"></div>
                {/* /.main-menu__nav */}
                <div className="main-menu__right">
                {/* <a href="#" class="main-menu__toggler mobile-nav__toggler">
                    <i class="fa fa-bars"></i>
                </a> */}
                {/* /.mobile menu btn */}
                <Link to="#" className="main-menu__search search-toggler">
                    <i className="icon-Search" />
                </Link>
                {/* /.search btn */}
                <Link to="/profile" className="main-menu__login">
                    <i className="icon-account-1" />
                </Link>
                {/* /.login btn */}
                {/* <a href="contact.html" class="eduact-btn"><span class="eduact-btn__curve"></span>Get In Touch</a>/.contact btn */}
                </div>
                {/* /.main-menu__right */}
            </div>
            {/* /.container */}
            </nav>
            {/* /.main-menu */}
        </header>

    <div className="stricky-header stricked-menu main-menu">
      <div className="sticky-header__content" />
      {/* /.sticky-header__content */}
    </div>
    {/* /.stricky-header */}
    {/*Hero Banner Start*/}
    <section
      className="hero-banner"
      style={{ backgroundImage: bannerimg }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="hero-banner__content">
              <div
                className="hero-banner__bg-shape1 wow zoomIn"
                data-wow-delay="300ms"
              >
                <div className="hero-banner__bg-round">
                  <div className="hero-banner__bg-round-border" />
                </div>
              </div>
              <h2
                className="hero-banner__title wow fadeInUp"
                data-wow-delay="400ms"
              >
                A Better
                <br /> Learning Journey Future Start Here
              </h2>
              <p
                className="hero-banner__text wow fadeInUp"
                data-wow-delay="500ms"
              >
                All the Lorem Ipsum generators on the Internet tend to repeat
                <br /> predefined chunks as necessary,
                <img
                  src={bannerimg2}
                  alt="eduact"
                />
              </p>
              <div
                className="hero-banner__btn wow fadeInUp"
                data-wow-delay="600ms"
              >
                {/* <a href="#" className="eduact-btn eduact-btn-second">
                  <span className="eduact-btn__curve" />
                  Business Course
                  <i className="icon-arrow" />
                </a> */}
                {/* <a className="eduact-btn">
                  <span className="eduact-btn__curve" />
                  Trending Course
                  <i className="icon-arrow" />
                </a> */}
              </div>
              {/* banner-btn */}
            </div>
            {/* banner-content */}
          </div>
          <div className="col-lg-6">
            <div
              className="hero-banner__thumb wow fadeInUp"
              data-wow-delay="700ms"
            >
              <img src={bannerimg3} alt="eduact" />
              <div
                className="hero-banner__cap wow slideInDown"
                data-wow-delay="800ms"
              >
                <img src={bannerimg4} alt="eduact" />
              </div>
              {/* banner-cap */}
              <div
                className="hero-banner__star wow slideInDown"
                data-wow-delay="850ms"
              >
                <img src={bannerimg5} alt="eduact" />
              </div>
              {/* banner-star */}
              <div
                className="hero-banner__map wow slideInDown"
                data-wow-delay="900ms"
              >
                <img src={bannerimg6} alt="eduact" />
              </div>
              {/* banner-map */}
            </div>
          </div>
        </div>
      </div>
      <div
        className="hero-banner__border wow fadeInUp"
        data-wow-delay="1100ms"
      />
      {/* banner-border */}
    </section>
    
      {CourseData?CourseData.map((item,index)=>(
        <section
      className="category-one"
      style={{ backgroundImage: bannerimg7 }}
    >
      <div className="container" >
        <div className="section-title text-center">
          <h5 className="section-title__tagline">
             {item.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 133 13"
              fill="none"
            >
              <path
                d="M9.76794 0.395L0.391789 9.72833C-0.130596 10.2483 -0.130596 11.095 0.391789 11.615C0.914174 12.135 1.76472 12.135 2.28711 11.615L11.6633 2.28167C12.1856 1.76167 12.1856 0.915 11.6633 0.395C11.1342 -0.131667 10.2903 -0.131667 9.76794 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M23.1625 0.395L13.7863 9.72833C13.2639 10.2483 13.2639 11.095 13.7863 11.615C14.3087 12.135 15.1593 12.135 15.6816 11.615L25.0578 2.28167C25.5802 1.76167 25.5802 0.915 25.0578 0.395C24.5287 -0.131667 23.6849 -0.131667 23.1625 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M36.5569 0.395L27.1807 9.72833C26.6583 10.2483 26.6583 11.095 27.1807 11.615C27.7031 12.135 28.5537 12.135 29.076 11.615L38.4522 2.28167C38.9746 1.76167 38.9746 0.915 38.4522 0.395C37.9231 -0.131667 37.0793 -0.131667 36.5569 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M49.9514 0.395L40.5753 9.72833C40.0529 10.2483 40.0529 11.095 40.5753 11.615C41.0976 12.135 41.9482 12.135 42.4706 11.615L51.8467 2.28167C52.3691 1.76167 52.3691 0.915 51.8467 0.395C51.3176 -0.131667 50.4738 -0.131667 49.9514 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M63.3459 0.395L53.9698 9.72833C53.4474 10.2483 53.4474 11.095 53.9698 11.615C54.4922 12.135 55.3427 12.135 55.8651 11.615L65.2413 2.28167C65.7636 1.76167 65.7636 0.915 65.2413 0.395C64.7122 -0.131667 63.8683 -0.131667 63.3459 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M76.7405 0.395L67.3643 9.72833C66.8419 10.2483 66.8419 11.095 67.3643 11.615C67.8867 12.135 68.7373 12.135 69.2596 11.615L78.6358 2.28167C79.1582 1.76167 79.1582 0.915 78.6358 0.395C78.1067 -0.131667 77.2629 -0.131667 76.7405 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M90.1349 0.395L80.7587 9.72833C80.2363 10.2483 80.2363 11.095 80.7587 11.615C81.2811 12.135 82.1317 12.135 82.6541 11.615L92.0302 2.28167C92.5526 1.76167 92.5526 0.915 92.0302 0.395C91.5011 -0.131667 90.6573 -0.131667 90.1349 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M103.529 0.395L94.1533 9.72833C93.6309 10.2483 93.6309 11.095 94.1533 11.615C94.6756 12.135 95.5262 12.135 96.0486 11.615L105.425 2.28167C105.947 1.76167 105.947 0.915 105.425 0.395C104.896 -0.131667 104.052 -0.131667 103.529 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M116.924 0.395L107.548 9.72833C107.025 10.2483 107.025 11.095 107.548 11.615C108.07 12.135 108.921 12.135 109.443 11.615L118.819 2.28167C119.342 1.76167 119.342 0.915 118.819 0.395C118.29 -0.131667 117.446 -0.131667 116.924 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M130.318 0.395L120.942 9.72833C120.42 10.2483 120.42 11.095 120.942 11.615C121.465 12.135 122.315 12.135 122.838 11.615L132.214 2.28167C132.736 1.76167 132.736 0.915 132.214 0.395C131.685 -0.131667 130.841 -0.131667 130.318 0.395Z"
                fill="#F1F2FD"
              />
            </svg>
          </h5>
          <h2 className="section-title__title">{item.name}</h2>
        </div>
        <CarouselProvider
        naturalSlideWidth={35}
        naturalSlideHeight={65}
        totalSlides={1000}
        visibleSlides={3}
      >
          <Slider>
            {item.data?item.data.map((data,index)=>(
              <Slide index={index+data.name} key={index}><a 
              className="col-xl-4 col-lg-4 col-md-6 col-sm-12 " 
              data-wow-delay="400ms" 
              key={index+data.name} 
            > 
              <div style={{ 
                marginLeft: "25px", 
                marginRight: "25px", 
                padding: "10px",
                borderRadius:"20px",
                border :"1px solid #000"
              }}>
                <a> 
                  <div className="course-two__thusmb">
                    <img src={data.thumbnail} alt="eduact" style={{ height: "200px", width: "100%",borderRadius:"25px" }}     onClick={() => handleCourseClick(item)}  />
                  </div>
                  {/* /.course-thumb */}
                  <div className="course-two__content">
                    <h3 className="course-two__title">
                      <a>
                        {data.name}
                      </a>
                    </h3>
                    <p>{data.description && data.description.substring(0, 15)}......</p> 
                    {/* <button className='btn btn-danger' onClick={()=>{setDeleteId(item.id)}} data-bs-target="#deletemodal" data-bs-toggle="modal">Delete</button> */}
                  </div>
                </a>
              </div>
            </a>
            </Slide>
            )):""}
            

</Slider>
        </CarouselProvider>
      </div>
    </section>
      )):""}

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
    {courseintro && <Courseintro data={courseitem} setPage={setPageUI} setIntroPage={setCourseIntro}/>}
    </>
  )
}

export default Home