/**
 * @generated SignedSource<<915343b8560e2ba261551880a5dd06db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SetupPaxumAccountPayoutMethodFragment$data = {
  readonly details: {
    readonly firstName: string;
    readonly lastName: string;
  };
  readonly " $fragmentType": "SetupPaxumAccountPayoutMethodFragment";
};
export type SetupPaxumAccountPayoutMethodFragment$key = {
  readonly " $data"?: SetupPaxumAccountPayoutMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SetupPaxumAccountPayoutMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SetupPaxumAccountPayoutMethodFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "AccountDetails",
        "kind": "LinkedField",
        "name": "details",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "details"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "a151f068d2a9e7ae6cb70bb89dfb6e13";

export default node;
