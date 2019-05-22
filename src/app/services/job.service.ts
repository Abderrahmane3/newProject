import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Job } from '../interfaces/job';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobsCollection: AngularFirestoreCollection<Job>;
  private jobID: string = null;


                constructor(private afs: AngularFirestore,    private activatedRoute: ActivatedRoute,
                  ) {
                  this.jobsCollection = this.afs.collection<Job>('Jobs',ref => ref.orderBy("createdAt", "desc"));

                }


                

                getJobs() {
                  return this.jobsCollection.snapshotChanges().pipe(
                    map(actions => {
                      return actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;

                        return { id, ...data };
                      });
                    })
                  );
                }

                addJob(job: Job) {
                  return this.jobsCollection.add(job);
                }

                getJob(id: string) {
                  return this.jobsCollection.doc<Job>(id).valueChanges();
                }

                updateJob(id: string, job: Job) {
                  return this.jobsCollection.doc<Job>(id).update(job);
                }

                deleteJob(id: string) {
                  return this.jobsCollection.doc(id).delete();
                }
                approveJob(id: string){
                  return this.jobsCollection.doc<Job>(id).set({status : true },{merge : true})
                  }
              }