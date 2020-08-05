export const state = () => {
	return {
		eventList: [
            {
                "_id": "5e7bd4afbe7f6e3484ac59bf",
                "marksAsDelivered": false,
                "name": "Receive",
                "code": "Receive",
                "type": "Receive",
                "protectFromDeletion": true
              },
              {
                "_id": "5e7bda81be7f6e3484ac59c0",
                "marksAsDelivered": true,
                "name": "Deliver",
                "code": "Deliver",
                "type": "Deliver",
                "protectFromDeletion": true
              },
              {
                "_id": "5e84e88c94fbb33310a3094a",
                "marksAsDelivered": false,
                "name": "Attempted Delivery",
                "code": "Attempted",
                "type": "Deliver",
                "protectFromDeletion": true,
                "emailNotifications": [{
                    "bcc": "ryantoner86@gmail.com",
                    "body": "Hello <<RECIPIENT_NAME>>",
                    "cc": "ryantoner86@gmail.com",
                    "from": "ryantoner86@gmail.com",
                    "subject": "Attempted Delivery - <<TRACKING_NUMBER>>",
                    "to": "ryan.toner@brynka.com"
                }]
              }
        ],

	}
}