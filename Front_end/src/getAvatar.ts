

export async function getAvatar(store: any, token: string, id: any) {
    try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(`http://c1r2s3:3000/users/avatar/${id}`, {headers});
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        store.commit('setAvatar', url);
        //store.dispatch('setSelfProps', {
            //isAvatar: url,
        //});
        //store.dispatch('initWebSocket');
        
    } catch (error) {
        alert(error)
    }
}

export default getAvatar;