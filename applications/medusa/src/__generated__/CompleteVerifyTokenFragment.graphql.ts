/**
 * @generated SignedSource<<8b2a4d23fa57c19ac990c920fe490d6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CompleteVerifyTokenFragment$data = {
  readonly accountStatus: {
    readonly registered: boolean;
  } | null;
  readonly sameDevice: boolean;
  readonly userAgent: string;
  readonly " $fragmentType": "CompleteVerifyTokenFragment";
};
export type CompleteVerifyTokenFragment$key = {
  readonly " $data"?: CompleteVerifyTokenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CompleteVerifyTokenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CompleteVerifyTokenFragment",
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
      "kind": "ScalarField",
      "name": "sameDevice",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuthenticationTokenAccountStatus",
      "kind": "LinkedField",
      "name": "accountStatus",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "registered",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "040074bb6af9da6ead5c03f4675b3919";

export default node;
