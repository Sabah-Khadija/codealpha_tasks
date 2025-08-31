
import { bestSellingShoes} from '../../../../constants/index.js'

const BestSellingShoes = () => {
 
 return (
	<section id="cocktails" className="noisy">
	 
	 <div className="list">
		<div className="popular">
		 <h2>Nike Best Sellers:</h2>
		 
		 <ul>
			{bestSellingShoes.map(({ name, country, price }) => (
			 <li key={name}>
				<div className="md:me-28">
				 <h3>{name}</h3>
				 <p>{country}</p>
				</div>
				<span>- {price}</span>
			 </li>
			))}
		 </ul>
		</div>
		
		<div className="loved">
		 <h2>Most loved :</h2>
		 
		 <ul>
			{bestSellingShoes.map(({ name, price }) => (
			 <li key={name}>
				<div className="me-28">
				 <h3>{name}</h3>
				</div>
				<span>- {price}</span>
			 </li>
			))}
		 </ul>
		</div>
	 </div>
	</section>
 )
}

export default BestSellingShoes
