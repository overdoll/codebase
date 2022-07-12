/**
 * @generated SignedSource<<334742595287535ac6b8e44983bde648>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubModalViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubTransactionProcessViewerFragment">;
  readonly " $fragmentType": "SupportClubModalViewerFragment";
};
export type SupportClubModalViewerFragment$key = {
  readonly " $data"?: SupportClubModalViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubModalViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubModalViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubTransactionProcessViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "b576473bc6c96d1ac65ab864a19d5e22";

export default node;
