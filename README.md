# Node Client for HiveServer2

HiveServer2 supports authentication of the Thrift client using either of these methods:

* Kerberos authentication
* LDAP authentication

## Implementation

Create Thrift SASL Node module that implement [TSaslClientTransport](https://github.com/apache/thrift/blob/master/lib/java/src/org/apache/thrift/transport/TSaslClientTransport.java) or create a SASL module from scratch using the packages below:

* [sasljs](https://github.com/nikhilm/sasljs)
* [js-sasl](https://github.com/jaredhanson/js-sasl)

The implementation will be similar to following:

* [thrift_sasl](https://github.com/cloudera/thrift_sasl)

Usage of thrift_sasl:

* [pyhs2](https://github.com/BradRuderman/pyhs2)

For more complicated implementations check the links below:

* [impyla](https://github.com/cloudera/impyla)
* [PyHive](https://github.com/dropbox/PyHive)

## Impyla

See the [Impyla Usage](http://blog.cloudera.com/blog/2014/04/a-new-python-client-for-impala/) before implementation.

## Further reading

* [HiveServer2 Security Configuration](http://www.cloudera.com/documentation/enterprise/5-2-x/topics/cdh_sg_hiveserver2_security.html)
