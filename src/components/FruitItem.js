import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled from 'styled-components'
import theme from '../utils/theme'

function FruitItem({
  id,
  name,
  price,
  disccount,
  images,
  color,
  quantity,
  addToBasket,
  removeToBasket,
}) {
  return (
    <Fruit color={color}>
      { quantity > 0 &&
        <Quantity>x{quantity}</Quantity>
      }
      <Image src={images[0]} alt='fruit' />
      <NamePriceWrapper>
        <ActionsWrapper className='ActionsWrapper'>
          <Plus onClick={() => addToBasket({
            fruitId: id,
            fruitName: name,
            quantity: quantity + 1,
            price,
            disccount,
          })}
          >+</Plus>
          <Minus
            disabled={quantity < 1}
            onClick={() => removeToBasket({
              fruitId: id,
              fruitName: name,
              quantity: quantity -1,
              price,
              disccount,
            })}
          >-</Minus>
          <Clear
            disabled={quantity < 1}
            onClick={() => removeToBasket({
              fruitId: id,
              fruitName: name,
              quantity: 0,
              price,
              disccount,
            })}
          >x</Clear>
        </ActionsWrapper>
        <Name>{name}</Name>
        <Price>{price} $</Price>
      </NamePriceWrapper>
    </Fruit>
  )
}

FruitItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  disccount: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  addToBasket: PropTypes.func.isRequired,
  removeToBasket: PropTypes.func.isRequired,
}

export default pure(FruitItem)

const Fruit = styled.div`
  flex: 1;
  background-color: ${props => props.color};
  height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 750px) {
    border-bottom: 2px solid ${theme.brown};
  }

  &:hover {
    .ActionsWrapper {
      opacity: 1;
      transform: perspective(600px) rotateX(0deg);
      transition: 0.4s all ease-in-out;
    }
  }
`

const Quantity = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  transform: rotate(10deg);
  background-color: ${theme.white};
  color: ${theme.brown};
`

const Image = styled.img`
  width: 180px;
  height: 180px;
  margin: auto;
  display: flex;
  object-fit: contain;
`

const NamePriceWrapper = styled.div`
  background-color: ${theme.priceBackground};
  height: 90px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${theme.brown};
  position: relative;
`

const Price = styled.div`
  font-size: 26px;
`

const Name = styled.div`
  font-size: 30px;
  text-transform: capitalize;
`

const ActionsWrapper = styled.div`
  position: absolute;
  height: 70px;
  background-color: ${theme.priceBackground};
  left: 0;
  right: 0;
  bottom: 100%;
  border-bottom: 1px dashed ${theme.brown};
  transform-origin: 50% 100% 0;
  transform: perspective(600px) rotateX(90deg);
  opacity: 0;
  transition: 0.4s all ease-in-out;
  display: flex;
  z-index: 2;
`
const Button = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s all ease-in-out;
  outline: 0;
  font-family: 'Mouse Memoirs', sans-serif;
  border: 0;
  background-color: transparent;
  line-height: 0;

  &:hover {
    background-color: ${theme.priceHover}
  }

  &:active {
    transition: 0.1s all ease-in-out;
    transform: scale(1.25);
    background-color: ${theme.white};
  }

  ::selection {
    background-color: transparent;
  }
`

const Minus = Button.extend`
  border-left: 1px dashed ${theme.lightBrown};
  border-right: 1px dashed ${theme.lightBrown};
  color: ${theme.green};
  font-size: 80px;
`

const Plus = Button.extend`
  color: ${theme.green};
  font-size: 80px;
`

const Clear = Button.extend`
  color: ${theme.red};
  font-size: 45px;
`
