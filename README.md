# <img src="https://cdn.rawgit.com/theupdateframework/artwork/3a649fa6/tuf-logo.svg" height="100" valign="middle" alt="TUF"/> A Framework for Securing Software Update Systems

⚠️ This project is not ready for general-purpose use! ⚠️

---

[The Update Framework (TUF)](https://theupdateframework.io/) is a framework for
secure content delivery and updates. It protects against various types of
supply chain attacks and provides resilience to compromise. This repository is written in Typescript. It is intended to conform to
version 1.0 of the [TUF
specification](https://theupdateframework.github.io/specification/latest/).

## About The Update Framework

The Update Framework (TUF) design helps developers maintain the security of a
software update system, even against attackers that compromise the repository
or signing keys.
TUF provides a flexible
[specification](https://github.com/theupdateframework/specification/blob/master/tuf-spec.md)
defining functionality that developers can use in any software update system or
re-implement to fit their needs.

TUF is hosted by the [Linux Foundation](https://www.linuxfoundation.org/) as
part of the [Cloud Native Computing Foundation](https://www.cncf.io/) (CNCF)
and its design is [used in production](https://theupdateframework.io/adoptions/)
by various tech companies and open source organizations. A variant of TUF
called [Uptane](https://uptane.github.io/) is used to secure over-the-air
updates in automobiles.

Please see [TUF's website](https://theupdateframework.com/) for more information about TUF!

## Documentation

- [Introduction to TUF's Design](https://theupdateframework.io/overview/)
- [The TUF Specification](https://theupdateframework.github.io/specification/latest/)
- [Developer documentation](https://theupdateframework.readthedocs.io/), including
  [API reference](https://theupdateframework.readthedocs.io/en/latest/api/api-reference.html)
- [Usage examples](https://github.com/github/tuf-js/tree/main/examples/client-example)

## Contact

Questions, feedback, and suggestions are welcomed. Feel free to email ejahnGithub@github.com

We strive to make the specification easy to implement, so if you come across
any inconsistencies or experience any difficulty, do let us know by sending an
email, or by reporting an issue in the GitHub [specification
repo](https://github.com/theupdateframework/specification/issues).

## Requirements

NODE >= 14
NPM >= 6

## License

This project is licensed under the terms of the MIT open source license. Please refer to [MIT](./LICENSE.md) for the full terms.

## Code of Conduct

Everyone interacting with this project is expected to follow the [Code of
Conduct](./CODE_OF_CONDUCT.md).

## Maintainers

@ejahnGithub

## Support

Please follow the [Support](./SUPPORT.md).

## Security

Please follow the [Security](./SECURITY.md).
