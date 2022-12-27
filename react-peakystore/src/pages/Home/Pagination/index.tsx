import './Pagination.module.scss'

import estilos from './Pagination.module.scss';

const Pagination = () => {
  return (

    <div className={estilos.paginationContainer}>
      <div className={estilos.paginationItem}></div>
      <div className={estilos.paginationItem}></div>
      <div className={estilos.paginationItem}></div>
      <div className={estilos.paginationItem}></div>
    </div>

  );
};

export default Pagination;