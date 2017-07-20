import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled from 'styled-components'
import FruitItem from './FruitItem'
import theme from '../utils/theme'

function ShoppingBasketView({
  fruits,
  fruitsError,
  addToBasket,
  removeToBasket,
  basket,
  clearBasket,
  disccount,
  saveReceipt,
}) {
  return (
    <Fruits>
      <FruitItemContainer>
        {fruits && fruits.map((fruit) => (
          <FruitItem
            key={fruit.id}
            id={fruit.id}
            name={fruit.name}
            price={fruit.price}
            disccount={fruit.disccount}
            images={fruit.images}
            color={fruit.color}
            addToBasket={addToBasket}
            removeToBasket={removeToBasket}
            quantity={basket.length > 0 && basket.find((item) => item.fruitId === fruit.id) ?
              basket.find((item) => item.fruitId === fruit.id).quantity : 0
            }
          />
        ))}
        { fruitsError &&
          <ErrorText>There was a problem loading the Data please Reload</ErrorText>
        }
      </FruitItemContainer>
      <Receipt id='receipt'>
        { basket.length < 1 &&
          <ItemReceipt placeholder>There isn't a fruit in the basket yet</ItemReceipt>
        }
        { basket.length > 0 &&
          basket.map((i) => {
            let disccountNumber = disccountCalc(basket, disccount)
            return disccountNumber && i.disccount ? <TotalContainer key={i.fruitId}>
              <ItemReceipt>
                {i.fruitName}: x{i.quantity} ${((i.quantity * i.price) - disccountNumber).toFixed(2)}
              </ItemReceipt>
              <Disccount>Disccount: ${disccountNumber}</Disccount>
            </TotalContainer> : <ItemReceipt key={i.fruitId}>
              {i.fruitName}: x{i.quantity} ${(i.quantity * i.price).toFixed(2)}
            </ItemReceipt>
          })
        }
        { basket.length > 0 &&
          <TotalContainer>
            <Separator />
            <Total>Total: ${(basket.map(
              (i) => i.quantity * i.price).reduce(
                (prev, curr) => prev + curr) - disccountCalc(
                  basket, disccount)).toFixed(2)}
            </Total>
          </TotalContainer>
        }
      </Receipt>
      <GetButton
        disabled={basket.length < 1}
        onClick={saveReceipt}
      >
        Get them!
      </GetButton>
      <ClearButton
        disabled={basket.length < 1}
        onClick={clearBasket}
      >
        Clear Basket
      </ClearButton>
    </Fruits>
  )
}

ShoppingBasketView.propTypes = {
  fruits: PropTypes.array.isRequired,
  fruitsError: PropTypes.string.isRequired,
  addToBasket: PropTypes.func.isRequired,
  removeToBasket: PropTypes.func.isRequired,
  clearBasket: PropTypes.func.isRequired,
  basket: PropTypes.array.isRequired,
  saveReceipt: PropTypes.func.isRequired,
}

export default pure(ShoppingBasketView)

let disccountCalc = (basket, disccount) => {
  let disccountItem = basket.find((i) => i.fruitId === disccount.fruit.id)
  return disccountItem
    ? Number(((Math.floor(
      disccountItem.quantity/disccount.base) * disccount.give) * disccountItem.price).toFixed(2))
    : 0
}

const Fruits = styled.div`
  display: flex;
  flex-direction: column;
`

const FruitItemContainer = styled.div`
  display: flex;
  height: 300px;

  @media (max-width: 750px) {
    height: auto;
    flex-direction: column;
  }
`

const Receipt = styled.div`
  background-color: ${theme.receiptBg};
  display: flex;
  flex-direction: column;
  padding: 35px 0 15px 0;
  justify-content: center;
  align-items: center;
  font-size: 26px;
`

const ErrorText = styled.h1`
  font-size: 30px;
  color: ${theme.red};
  text-align: center;
  flex: 1;
  align-self: center;
`

const ItemReceipt = styled.div`
  color: ${theme.brown};
  padding: ${props => props.placeholder ? '0 0 15px 0' : '15px 0'};
`

const Disccount = styled.div`
  color: ${theme.brown};
  padding: 10px 0;
  font-size: 18px;
`

const Separator = styled.div`
  height: 2px;
  background-color: ${theme.brown};
  width: 200px;
  margin-top: 22px;
`

const Total = styled.div`
  color: ${theme.brown};
  padding: 20px 0 30px 0;
  font-size: 35px;
`

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ActionButton = styled.button`
  padding: 20px 0;
  font-size: 35px;
  outline: 0;
  transition: 0.1s all ease-in-out;
  font-family: 'Mouse Memoirs', sans-serif;
  border: 0;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};

  &:active {
    transition: 0.1s all ease-in-out;
    transform: scale(1.25);
  }
`

const GetButton = ActionButton.extend`
  background-color: ${theme.green2};
  color: ${theme.darkGreen};

  &:active {
    background-color: ${theme.green};
  }
`

const ClearButton = ActionButton.extend`
  background-color: ${theme.header2};
  color: ${theme.title};

  &:active {
    background-color: ${theme.header1}
  }
`
