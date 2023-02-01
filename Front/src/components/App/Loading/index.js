import './loading.scss';

const Loading = () => (
  <div className="moon">
    <img 
      className="rocket" 
      src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/space-rocket-512.png" 
      style={{
        width:30 + 'px', 
        height:20 + 'px',
      }} 
    />
    <ul>
        <li className='Rocky'></li>
        <li className='Rocky'></li>
        <li className='Rocky'></li>
        <li className='Rocky'></li>
        <li className='Rocky'></li>
        <li className='Rocky'></li>
        <li className='Rocky'></li>
    </ul>
</div>
);

export default Loading;
