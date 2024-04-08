import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import { useCallback, useLayoutEffect, useState } from 'react';
import './card.css';

const Card = () => {
  const [isFav, setIsFav] = useState(false);

  // toggle fav icon on click. TODO - still a dummy
  const handleFavClick = () => {
    setIsFav((prev) => !prev);
  };

  //   show/hide card details
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);

  const handleRotate = () => setIsDetailExpanded((prev) => !prev);

  const rotateMoreStyle = isDetailExpanded ? 'rotate(-180deg)' : 'rotate(0)';

  //   toggle height of detail node on expand/shrink
  const [detailHeight, setDetailHeight] = useState(0);
  const [detailNode, setDetailNode] = useState(null);

  const cardDetailCallbackRef = useCallback((node) => {
    if (node !== null) {
      setDetailNode(node);
    }
  }, []);

  useLayoutEffect(() => {
    if (isDetailExpanded && detailNode) {
      setDetailHeight(detailNode.scrollHeight);
    } else {
      setDetailHeight(0);
    }
  }, [isDetailExpanded, detailNode]);

  return (
    <div className="card">
      <div className="card-nav-wrapper">
        <div className="nav-avatar-wrapper">
          <div className="avatar">S</div>
        </div>
        <div className="nav-title-wrapper">
          <span className="title">Lorem ipsum dolor sit</span>
          <span className="sub-title">April 5, 2024</span>
        </div>
        <div className="nav-more-wrapper">
          <button
            aria-label="card options"
            className="card-btn nav-more-button"
          >
            <MoreVertIcon />
          </button>
        </div>
      </div>
      <div className="card-img-wrapper">
        <img alt="Test" className="card-img" src="/test-img.jpg" />
      </div>

      <div className="card-summary-wrapper">
        <p className="card-summary">
          I am a Full stack developer using Java with over 2 years of
          experience. I have developed a strong foundation in creating and
          maintaining robust and scalable web applications. I am skilled in
          using Spring Boot to develop RESTful APIs and implementing
          microservices architecture. I am a Data Engineering on Microsoft Azure
          (DP-203) & Microsoft Azure Fundamentals (AZ-900) certified
          professional. I work well under pressure and consistently meet
          deadlines and targets while delivering high-quality work. Skills
        </p>
      </div>

      <div className="card-actions-wrapper">
        <button
          aria-label="Favorite"
          className="card-btn actions-fav-btn"
          onClick={handleFavClick}
        >
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
        <button aria-label="Share" className="card-btn actions-share-btn">
          <ShareIcon />
        </button>
        <button
          style={{
            transform: rotateMoreStyle,
          }}
          aria-label="Toggle"
          className="card-btn actions-expand-btn"
          onClick={handleRotate}
        >
          <ExpandMoreOutlinedIcon />
        </button>
      </div>

      <div
        ref={cardDetailCallbackRef}
        style={{ height: detailHeight }}
        className="card-detail-wrapper"
      >
        <div className="card-detail-inner">
          <p className="card-detail">
            Java • Spring Boot • Spring Data JPA • Java Database Connectivity
            (JDBC) • Hibernate • Spring Security • MySQL • Git • CI/CD • HTML •
            CSS • React.js • Next.js • Tailwind CSS • Shopify Python • Microsoft
            Azure • Azure Databricks • Azure Machine Learning Full Stack
            <h2>Developer, HOK Beauty Pvt Ltd, Dec 2023</h2> –{' '}
            <p>
              Present Applied expertise in web development through hands-on
              experience in e-commerce projects. Successfully implemented key
              functionalities, including quick view and add-to-cart features,
              enhancing user experience Collaborated on the integration of
              Indian Logistics Services and clients like Ekart and Delhivery to
              streamline order fulfillment processes. Proven proficiency in
              crafting bespoke Shopify themes tailored to meet specific client
              needs. Extensive experience leveraging Shopify APIs to develop
              feature-rich and customized e-commerce websites. Successfully
              integrated third-party services and optimized workflows to ensure
              seamless e-commerce operations.
            </p>
            <h2>Programmer Analyst, Cognizant, Oct 2022 – Nov 2023 (1 year)</h2>
            Connect to Data Sources Oracle SQL and perform operations using
            Spring JDBC, Spring Data JPA, and Spring ORM. Configure POJOs with
            backend tables in Hibernate to achieve the associations. Develop
            code using Design patterns like DAO, Factory Pattern, Singleton, and
            Microservice Architecture. Facilitated seamless online transactions
            by integrating Razorpay payment gateway for secure and efficient
            payment processing. Configured and registered REST services with
            Netflix Eureka for service discovery. Participated in code reviews
            and provided feedback to peers to ensure high quality, maintainable
            code. Got an opportunity to learn Spring Security, Basic
            Authentication, OAuth 2.0, OpenID Connect, and JWT tokens. Full
            Stack Developer (intern), Cognizant, Feb 2022 – Aug 2022 (6 Months)
            Implemented global exception handling and logging for Rest
            Controllers using SLF4J. Conducted extensive testing and debugging
            on Spring Boot application, resulting in an increased unit test
            coverage from 55% to 90%. Used Swagger 2.0 to describe and document
            RESTful APIs. Used Postman to design, build, test, and iterate APIs.
            Experience in Version control (git) and Code Repository (GitHub).
            Licenses & Certifications Microsoft Certified: Azure Data Engineer
            Associate - Microsoft Issued: Jun 2023 – Expires: Jun 2024
            Certification Id: I802-3769 Skills: Azure Data Lake Storage, Azure
            Databricks, Azure Data Factory, Azure Synapse Analytics, Azure
            Stream Analytics AWS Certified Machine Learning - Specialty - Udemy
            Issued: Jun 2023 Agile Fundamentals: Including Scrum & Kanban -
            Udemy Issued: Jun 2023 Microsoft Certified: Azure Fundamentals -
            Microsoft Issued: Mar 2022 Certification Id: I789-0779 Skills: Cloud
            concepts, Azure management and governance, Azure architecture and
            services Education Guru Gobind Singh Indraprastha University Master
            of Technology - MTech, Information Technology, Sep 2020 – Aug 2022 I
            have completed my master’s degree from USICT, GGSIPU in the field of
            Information Technology. I have done my major project in the field of
            Artificial Intelligence and Neural Networks. KIIT College of Engg.
            Sohna Road, Bhondsi (Gurgaon) Bachelor of Technology - BTech,
            Electronics and Communications Engineering, Aug 2014 - Aug 2018 I
            have completed my bachelor’s degree in ECE from KIIT College of
            Engineering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
