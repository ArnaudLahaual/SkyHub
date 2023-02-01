// == Import
import { useDispatch, useSelector } from 'react-redux';

import './editSession.scss';
import areasList from '../../../data/areas';

import { changeFieldValue } from '../../../actions/user';
import { editSession, fetchSession } from '../../../actions/sessions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

console.log(areasList);

function EditSession() {

  useEffect(() => {
    dispatch(fetchSession(id));
  }, []);

  const { id }  = useParams();
  
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(changeFieldValue(evt.target.name, evt.target.value))
  };

  const handleEdit = (evt) => {
    evt.preventDefault();
    dispatch(editSession(id));
  };


  const { 
    sessionTitle,
    sessionDescription,
    sessionCity,
    sessionRegion,
    sessionDate,
    sessionTime} = useSelector((state) => state.user);
    console.log(sessionTitle,sessionDescription);

  return(
      <div className="sectionForm ">
        
            <h1 className='sectionForm__title text-center'>Modifier la session</h1>
  
        <form className='sectionForm__form'
        onSubmit={handleEdit}
         >
            
        {/* {Titre} */}
        <label className="sectionForm__form__title">Titre</label>
  
        <input onChange={handleChange} className="sectionForm__form__field" 
        type="text" name="sessionTitle" placeholder="Titre" value={sessionTitle}/>
  
        {/* {Date} */}
        <label className="sectionForm__form__date">Date</label>
  
        <input onChange={handleChange}  className="sectionForm__form__field" 
        type="date" name="sessionDate" placeholder="Date" value={sessionDate} />

        {/* {Time} */}
        <label className="sectionForm__form__time">Heure</label>
  
        <input onChange={handleChange}  className="sectionForm__form__field" 
        type="time" name="sessionTime" placeholder="Heure" value={sessionTime}
        />

        {/* {Description} */}
        <label className="sectionForm__form__description">Description</label>
  
        <textarea onChange={handleChange}  rows="5" cols="50" className="sectionForm__form__field" 
        type="text" name="sessionDescription" placeholder="Modifiez votre session" value={sessionDescription} />
  
        {/* {City} */}
        <label className="sectionForm__form__city">Ville</label>
  
        <input onChange={handleChange}  className="sectionForm__form__field" 
        type="text" name="sessionCity" placeholder="Ville" value={sessionCity} />
  
        <label className="sectionForm__form__region">Région</label>
        <select 
          onChange={handleChange} 
          className="sectionForm__form__field" 
          type="text" 
          name="sessionRegion" 
          placeholder="Région"
          value={sessionRegion}
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
export default EditSession;
