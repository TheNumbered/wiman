import * as OneSignal from '@onesignal/node-onesignal';
import dotenv from 'dotenv';
import process from 'process';
dotenv.config({ path: '.env.local' });

class NotificationService {
  constructor() {
    const configuration = OneSignal.createConfiguration({
      userAuthKey: '<YOUR_USER_KEY_TOKEN>', //Not needed for sending notifications
      restApiKey: process.env.ONESIGNAL_REST_API_KEY,
    });
    this.client = new OneSignal.DefaultApi(configuration);
    this.appId = '89ba3c7e-11bc-49ed-930c-77f511646f58';

    this.filters = {
      userFilters: [{ field: 'tag', key: 'role', relation: '=', value: 'user' }],
      adminFilters: [{ field: 'tag', key: 'role', relation: '=', value: 'admin' }],
      maintainerFilters: [{ field: 'tag', key: 'role', relation: '=', value: 'maintainer' }],
    };
  }

  async sendNotification({ heading, content, userIds = [], filters = [] }) {
    try {
      const notification = new OneSignal.Notification();
      notification.app_id = this.appId;

      notification.contents = { en: content };
      notification.headings = { en: heading };
      notification.included_segments = ['All'];
      if (userIds.length > 0) {
        notification.include_aliases = {
          external_id: userIds,
        };
      }

      notification.filters = filters;
      const response = await this.client.createNotification(notification);
      return response;
    } catch (error) {
      console.log('Error sending notification:', error.message);
    }
  }
}

export default NotificationService;
