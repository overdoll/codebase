/**
 * @generated SignedSource<<8cfd28d91da78ef46dd0ed1aba26cb22>>
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
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "1588224180e26efe54c8cf9bd1d95302";

export default node;
