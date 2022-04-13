/**
 * @generated SignedSource<<888976b93b11a26afbc597c5cdc58e7b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConfirmFragment$data = {
  readonly userAgent: string;
  readonly location: {
    readonly city: string;
    readonly subdivision: string;
    readonly country: string;
  };
  readonly " $fragmentType": "ConfirmFragment";
};
export type ConfirmFragment = ConfirmFragment$data;
export type ConfirmFragment$key = {
  readonly " $data"?: ConfirmFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConfirmFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConfirmFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userAgent",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "subdivision",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "country",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "1774875aedddd8f139ac54b82aa004ad";

export default node;
