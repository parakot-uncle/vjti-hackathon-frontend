import CurrentBanner from "./CurrentBanner";
import { useContext, useState } from "react";
import Carousel from "../common/Carousel";
import TrendingNow from "./TrendingNow";
import BlockChainContext from "@/store/blockchain-context";
import GenericModal from "../common/GenericModal";
import Nftdet from "../profileHeader/NFTDetails/Nftdet";

const recommendations = [
  "https://www.indiewire.com/wp-content/uploads/2017/09/imperial-dreams-2014.jpg?w=426",
  "https://www.indiewire.com/wp-content/uploads/2017/09/crouching-tiger-hidden-dragon-sword-of-destiny-2016.jpg?w=675",
  "https://flxt.tmsimg.com/assets/p9691630_b_v8_ag.jpg",
  "https://cdn.cinematerial.com/p/297x/jwqwceyo/american-factory-movie-poster-md.jpg?v=1565930430",
  "https://static.theprint.in/wp-content/uploads/2022/05/posterrrstranger2022052703092620220527033302.jpg",
  "https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
  "https://hips.hearstapps.com/esq.h-cdn.co/assets/17/06/1486417029-girlfriends-day-keyart.jpg?resize=980:*",
];

function Home(props) {
  const blockChainCtx = useContext(BlockChainContext);
  const [currentTokenId, setCurrentTokenId] = useState("");

  const NFT = blockChainCtx?.NFTs?.filter((nft) => {
    return nft?.tokenId === currentTokenId;
  })[0]

  const NFTClickHandler = (tokenId) => {
    setCurrentTokenId(tokenId);
  };

  const closeModalHandler = () => {
    setCurrentTokenId("");
  }

  const buyNFTHandler = () => {

  }

  return (
    <>
      <div className="pb-10">
        <CurrentBanner />
        <div className="px-16">
          <Carousel
            items={blockChainCtx?.NFTs}
            className=""
            onCardClick={NFTClickHandler}
          />
        </div>
        <TrendingNow items={recommendations} />
      </div>
      {currentTokenId && (
        <GenericModal
          className="w-[60%] h-[65%]"
          closeModal={closeModalHandler}
          posText="Buy"
          negText="Cancel"
          posHandler={buyNFTHandler}
          negHandler={closeModalHandler}
        >
          <Nftdet {...NFT} currentAccount={blockChainCtx?.accountAddress}></Nftdet>
        </GenericModal>
      )}
    </>
  );
}

export default Home;
