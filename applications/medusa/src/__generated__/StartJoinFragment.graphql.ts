/**
 * @generated SignedSource<<3677bd8c5632b95189b965b18d73836d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StartJoinFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ViewAuthenticationTokenJoinFragment">;
  readonly " $fragmentType": "StartJoinFragment";
};
export type StartJoinFragment$key = {
  readonly " $data"?: StartJoinFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StartJoinFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StartJoinFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewAuthenticationTokenJoinFragment"
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "8cc0d0642336b3db6d98d5b1bb7f765f";

export default node;
