import React from 'react'
import PropTypes from 'prop-types'
import logo from '../assets/logo.png'
import styled from 'styled-components'
import theme from '../utils/theme'
import pure from 'recompose/pure'

function HeaderView({ disccount, disccountError, totalItems }) {
  return (
    <TopBar>
      { totalItems > 0 &&
        <TotalCount>{totalItems}</TotalCount>
      }
      <Logo src={logo} alt='logo' />
      <Title>Shopping Basket</Title>
      { disccount.status && !disccountError &&
        disccountSubtitle(
          disccount.base,
          disccount.give,
          disccount.fruit.plural
        )
      }
    </TopBar>
  )
}

HeaderView.propTypes = {
  disccount: PropTypes.object.isRequired,
  disccountError: PropTypes.string.isRequired,
  totalItems: PropTypes.number.isRequired,
}

export default pure(HeaderView)

const TopBar = styled.div`
  height: 170px;
  padding: 20px;
  color: ${theme.title};
  text-align: center;
  box-shadow: 0 0 0 0.5em ${theme.shadow} inset;
  background-image: repeating-linear-gradient(45deg, ${theme.header1}, ${theme.header1} 100px, ${theme.header2} 100px, ${theme.header2} 200px);

  @media (max-width: 425px) {
    height: 205px;
  }
`

const TotalCount = styled.div`
  position: absolute;
  top: 13px;
  left: 52%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  transform: translateX(-52%);
  background-color: ${theme.red};
  color: ${theme.white};
`

const Logo = styled.img`
  height: 80px;
`

const Title = styled.h1`
  margin: 0;
  font-size: 40px;
`

const Subtitle = styled.h2`
  margin: 0;
  font-size: 32px;
`
let disccountSubtitle = (base, give, name) => <Subtitle>‘ Today {base} {name} for the price of {base - give} ’</Subtitle>
