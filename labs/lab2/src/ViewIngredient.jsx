import { useOutletContext, useParams } from 'react-router-dom';

function ViewIngredient(){
    let params = useParams();
    const { inventory } = useOutletContext();
    return(
        <div class="alert alert-info" role="alert">
            {inventory["params.name"]}
        </div>
    )
}

export default ViewIngredient;