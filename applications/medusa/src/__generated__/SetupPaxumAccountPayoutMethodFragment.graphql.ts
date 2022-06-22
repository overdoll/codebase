/**
 * @generated SignedSource<<ac3baac2ce1c202516e0bb359900e9d5>>
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
    readonly country: {
      readonly alpha3: string;
    };
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
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": null,
              "concreteType": "Country",
              "kind": "LinkedField",
              "name": "country",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "alpha3",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            "action": "THROW",
            "path": "details.country"
          },
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

(node as any).hash = "b30507dc7c922d4b96116eb7d50dc488";

export default node;
