import css from './Button.module.css';

export const Button = ({onLoadMore, showImg}) => {
    return (
        showImg && (
      <button 
      type="button" 
      className={css.Button}
      onClick={onLoadMore}>
        Load more
      </button>
        )
    )
}
