const AddToCartButton = ({ productId }) => {
  const state = React.useState({
    added: false,
    busy: false,
  });
  const actualState = state[0];
  const setState = state[1];
  const { added, busy } = actualState;

  const onClick = () => {
    setState({
      ...actualState,
      busy: true,
    });

    setTimeout(() => {
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

// old pre 18 method of render
const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  const root = ReactDOM.createRoot(productTileControl);

  root.render(<ProductControls productId={index}></ProductControls>);
});
