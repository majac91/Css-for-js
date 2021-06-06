import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.

  const variant =
    typeof salePrice === "number"
      ? "on-sale"
      : isNewShoe(releaseDate)
      ? "new-release"
      : "default";

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        {variant === "new-release" && <Relese>Just released!</Relese>}
        {variant === "on-sale" && <Sale>Sale</Sale>}
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  margin-bottom: 62px;
  max-width: 30%;
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 45%;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    max-width: 100%;
  }
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Sale = styled.span`
  background: red;
  position: absolute;
  z-index: 1;
  right: -4px;
  top: 12px;
  padding: 7px 7px 9px 10px;
  background: #c5295d;

  color: white;
  border-radius: 2px;
`;

const Relese = styled.span`
  background: blue;
  position: absolute;
  z-index: 1;
  right: -5px;
  top: 12px;
  padding: 7px 7px 9px 11px;
  background: #6868d9;
  color: white;
  border-radius: 2px;
`;

export default ShoeCard;
