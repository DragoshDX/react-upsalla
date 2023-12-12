const AddToCartButton = ({ productId }) => {
  const state = React.useState({
    added: false,
    busy: false,
  });
  const actualState = state[0];
  const setState = state[1];
  const { added, busy } = actualState;

  const onClick = () => {
    // set state as busy before request
    setState({
      ...actualState,
      busy: true,
    });

    // simulate request
    setTimeout(() => {
      dispatchEvent(
        new CustomEvent('addToCart', {
          detail: {
            productId,
          },
        }),
      );

      // mark state as done
      setState({
        ...actualState,
        added: !actualState.added,
      });
    }, Math.floor(Math.random() * 3000));
  };

  return (
    <button
      className={`product-a2c ${added ? 'active' : ''}`}
      type="button"
      title={added === true ? 'Remove from Cart' : 'Add to Cart'}
      onClick={onClick}
      disabled={busy}
    >
      {added === true ? `PID: ${productId} in cart` : 'Add to Cart'}{' '}
      {busy === true ? <i className="fas fa-spinner"></i> : null}
    </button>
  );
};

const ProductControls = (props) => {
  const { productId } = props;

  return <AddToCartButton productId={productId}></AddToCartButton>;
};

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  const root = ReactDOM.createRoot(productTileControl);

  root.render(<ProductControls productId={index}></ProductControls>);
});

const HeaderCartCounter = () => {
  const state = React.useState({
    productIds: [],
    qty: 0,
  });
  const actualState = state[0];
  const setState = state[1];

  React.useEffect(() => {
    addEventListener('addToCart', ({ detail }) => {
      const { productId } = detail;

      setState((previousState) => {
        return {
          productIds: [...previousState.productIds, productId],
          qty: previousState.qty + 1,
        };
      });
    });
  }, []);

  const showProducts = () => {
    let message = '';
    if (actualState.qty <= 0) {
      message = 'There are no products in your cart.';
    } else {
      message = `These are the pids in your cart: ${actualState.productIds}`;
    }

    alert(message);
  };

  return (
    <div className="header-cart" onClick={showProducts}>
      <span className="cart-qty">{actualState.qty}</span>
      <i className="fas fa-shopping-cart icon"></i>
    </div>
  );
};

const HeaderCounters = () => {
  return (
    <>
      <HeaderCartCounter></HeaderCartCounter>
      {/* headwerwlcounter */}
    </>
  );
};

const headerCounters = document.querySelector('.header-counters');
ReactDOM.createRoot(headerCounters).render(<HeaderCounters></HeaderCounters>);
