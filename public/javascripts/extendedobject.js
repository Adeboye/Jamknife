class Post extends Parse.Object {
	constructor() {
		super('Post');
	}
	
	static makepost(strength) {
		var post = new Post();
		return post;
	}
}

Parse.Object.registerSubclass('Post', Post);


class UserInfo extends Parse.Object {
	constructor() {
		super('UserInfo');
	}
	
	static makeuser() {
		var UserInfo = new UserInfo();
		return UserInfo;
	}
}

Parse.Object.registerSubclass('UserInfo', UserInfo);
