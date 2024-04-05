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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
          repellendus nesciunt fugiat fuga odio iure saepe accusantium
          blanditiis consequuntur nemo impedit autem, cumque voluptatum magni
          distinctio reprehenderit ea dignissimos maxime.
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            quis numquam rem earum dolores vero quia reiciendis sint, saepe iste
            deserunt perferendis a molestias possimus culpa impedit. Deleniti,
            nam vitae! Dolorum nam iure sint fuga ad in eius culpa quae.
            Voluptatum quod fugiat maiores ipsam asperiores, similique numquam
            facere quia cupiditate, quae earum, repellat autem facilis cum eius
            obcaecati architecto. Est, quia aliquid! Molestiae est suscipit
            nostrum vero, voluptate recusandae totam, eius voluptatum facere
            quasi quaerat dignissimos consequuntur sunt aspernatur fugit vel
            optio nihil ex ea earum expedita laudantium! Dolores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
