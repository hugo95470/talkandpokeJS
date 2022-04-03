import { RefreshControl } from 'react-native';

export default function AfficheMedium(props) {

    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        //ICI FAIRE LE REFRESH DES AFFICHES
        setAffiches("")
        reloadAffiches()

        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <RefreshControl
                colors={["#FEA52A", "#FEA52A"]}
                refreshing={refreshing}
                onRefresh={onRefresh} />
    )
}