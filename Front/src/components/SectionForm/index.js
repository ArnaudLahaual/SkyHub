// == Import
import { useDispatch, useSelector } from 'react-redux';
import { AddSession } from '../../actions/sessions';
import { changeFieldValue } from '../../actions/user';
import './sectionform.scss';
import areasList from '../../data/areas';

console.log(areasList);

function SectionForm() {
  
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    console.log(evt)
    dispatch(changeFieldValue(evt.target.name, evt.target.value))
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(AddSession());
  };

  const { 
    sessionTitle,
    sessionDescription,
    sessionCity,
    sessionRegion,
    sessionDate,
    sessionTime} = useSelector((state) => state.user);

  return(
      <div className="sectionForm ">
        
            <h1 className='sectionForm__title text-center'>Ajouter une session</h1>
  
        <form className='sectionForm__form'
        onSubmit={handleSubmit} >
            
        {/* {Titre} */}
        <label className="sectionForm__form__title">Titre*</label>
  
        <input onChange={handleChange} className="sectionForm__form__field" 
        type="text" name="sessionTitle" placeholder="Titre" value={sessionTitle} required/>
  
        {/* {Date} */}
        <label className="sectionForm__form__date">Date*</label>
  
        <input onChange={handleChange}  className="sectionForm__form__field" 
        type="date" name="sessionDate" placeholder="Date" value={sessionDate} required />

        {/* {Time} */}
        <label className="sectionForm__form__time">Heure*</label>
  
        <input onChange={handleChange}  className="sectionForm__form__field" 
        type="time" name="sessionTime" placeholder="Heure" value={sessionTime} required
        />

        {/* {Description} */}
        <label className="sectionForm__form__description">Description*</label>
  
        <textarea onChange={handleChange}  rows="5" cols="30" className="sectionForm__form__field" 
        type="text" name="sessionDescription" placeholder="Modifiez votre session" value={sessionDescription} required />
  
        {/* {City} */}
        <label className="sectionForm__form__city">Ville*</label>
  
        <input onChange={handleChange}  className="sectionForm__form__field" 
        type="text" name="sessionCity" placeholder="Ville" value={sessionCity} required />
  
        <label className="sectionForm__form__region">Région*</label>
        <select 
          onChange={handleChange} 
          className="sectionForm__form__field" 
          type="text" 
          name="sessionRegion" 
          placeholder="Région"
          value={sessionRegion}
          required
        >
          <option value="">-</option>
          {areasList.map((region) => 
            (<option value={region} key={region}>{region}</option>)
          )}
        </select>
        
            {/* {Image} */}
            <img src='' alt='' placeholder='Importer une photo'></img>
            
            <button 
              type="submit"
              className="sectionForm__form__submit"
            >
              Valider
            </button>
          </form>
      
      </div>
  );
  }

// == Export
export default SectionForm;
