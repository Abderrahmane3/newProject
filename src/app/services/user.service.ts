import { AngularFireAuth } from '@angular/fire/auth'
import { Injectable } from '@angular/core'
import { User } from 'src/app/interfaces/user';






@Injectable()
export class UserService {
	private user: User

	constructor(private afa: AngularFireAuth) {

	}

			setUser(user: User) {
				this.user = user
			}

			getUsername(): string {
				return this.user.username
			}
			
		    getUID(): string {
				return this.user.uid
			}

	

	
}