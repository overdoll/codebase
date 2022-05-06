/**
 * @generated SignedSource<<948c5db2c9fc5641b28e1007a94beb06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPayoutMethodAlertFragment$data = {
  readonly owner: {
    readonly payoutMethod: {
      readonly __typename: string;
    } | null;
  };
  readonly " $fragmentType": "ClubPayoutMethodAlertFragment";
};
export type ClubPayoutMethodAlertFragment = ClubPayoutMethodAlertFragment$data;
export type ClubPayoutMethodAlertFragment$key = {
  readonly " $data"?: ClubPayoutMethodAlertFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPayoutMethodAlertFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPayoutMethodAlertFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "payoutMethod",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "2a20a3c05febfcbc36b8e7e413aaa902";

export default node;
