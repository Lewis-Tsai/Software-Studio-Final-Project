using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace WSMGameStudio.Guns
{
    public class Missile : MonoBehaviour
    {
        public GameObject explosionPrefab;
        public ParticleSystem smokeTrail;
        public float acceleration = 3000f;
        public float maxSpeed = 300f;
        public float lifeTime = 3f;

        public float mag;

        public bool followTarget = false;
        public Transform target;
        public List<string> targetTags;

        private Rigidbody _rigidBody;
        private float time = 0f;

        // Use this for initialization
        void Awake()
        {
            _rigidBody = GetComponent<Rigidbody>();
        }

        private void FixedUpdate()
        {
            time += Time.deltaTime;

            if (time >= lifeTime)
                Explode();

            //if (_rigidBody.velocity.magnitude < maxSpeed)
            //    _rigidBody.velocity += acceleration * Time.deltaTime * transform.forward;
            //else
            //    _rigidBody.velocity += transform.forward;
            _rigidBody.velocity = maxSpeed * transform.forward;

            mag = _rigidBody.velocity.magnitude;

            if (followTarget && target != null)
            {
                Quaternion targetRotation = Quaternion.LookRotation(target.position - transform.position);
                _rigidBody.MoveRotation(Quaternion.RotateTowards(transform.rotation, targetRotation, 20f));
            }
        }

        private void OnCollisionEnter(Collision collision)
        {
            Explode();
        }

        private void OnTriggerEnter(Collider other)
        {
            if (followTarget && target == null && targetTags.Contains(other.gameObject.tag))
                target = other.transform;
        }

        private void Explode()
        {
            smokeTrail.transform.parent = null;
            smokeTrail.Stop();
            GameObject explosion = Instantiate(explosionPrefab, transform.position, transform.rotation);
            Destroy(this.gameObject);
        }
    }

}