import React from 'react';
import PropTypes from 'prop-types';

function DetailSellersProducts({ match: { params: { id } } }) {
  return (
    <div>{id}</div>
  );
}

DetailSellersProducts.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailSellersProducts;
