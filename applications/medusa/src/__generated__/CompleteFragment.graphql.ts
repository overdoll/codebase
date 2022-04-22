/**
 * @generated SignedSource<<263f7979f3203c1cd188694abb6455df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CompleteFragment$data = {
  readonly userAgent: string;
  readonly sameDevice: boolean;
  readonly accountStatus: {
    readonly registered: boolean;
  } | null;
  readonly " $fragmentType": "CompleteFragment";
};
export type CompleteFragment = CompleteFragment$data;
export type CompleteFragment$key = {
  readonly " $data"?: CompleteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CompleteFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CompleteFragment",
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

(node as any).hash = "a6efac7a80e179faad64636bbdb013f4";

export default node;
