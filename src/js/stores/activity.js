import { Store } from 'flummox';
import StoreUtils from '../utils/StoreUtils';


export default class ActivityStore extends Store {
    constructor(flux) {
        super();

        this.setState({
            activities: []
        });

        var activityActions = flux.getActions('activity');
        this.register(activityActions.createActivity,
            this.onCreateActivityComplete);
        this.register(activityActions.retrieveActivities,
            this.onRetrieveActivitiesComplete);
        this.register(activityActions.updateActivity,
            this.onUpdateActivityComplete);
        this.registerAsync(activityActions.deleteActivity,
            this.onDeleteActivityBegin, null);
    }

    getActivity(id) {
        return this.state.activities.find(a => (a.id == id));
    }

    getActivities() {
        return this.state.activities;
    }

    onRetrieveActivitiesComplete(res) {
        this.setState({
            activities: res.data.data
        });
    }

    onUpdateActivityComplete(res) {
        const activity = res.data.data;

        StoreUtils.updateOrAdd(this.state.activities, activity.id, activity);

        this.setState({
            activities: this.state.activities
        });
    }

    onCreateActivityComplete(res) {
        const activity = res.data.data;

        this.state.activities.push(activity);

        this.setState({
            activities: this.state.activities
        });
    }

    onDeleteActivityBegin(activityId) {
        StoreUtils.remove(this.state.activities, activityId);

        this.setState({
            activities: this.state.activities
        });
    }

    static serialize(state) {
        return JSON.stringify(state);
    }

    static deserialize(stateStr) {
        return JSON.parse(stateStr);
    }
}