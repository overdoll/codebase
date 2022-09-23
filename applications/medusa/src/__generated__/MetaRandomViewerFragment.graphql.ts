/**
 * @generated SignedSource<<6e6f82556cebc6d2683b046bdf13d03d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaRandomViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerRandomViewerFragment">;
  readonly " $fragmentType": "MetaRandomViewerFragment";
};
export type MetaRandomViewerFragment$key = {
  readonly " $data"?: MetaRandomViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaRandomViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaRandomViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerRandomViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "69834ddd76072247a57ce60d8eb5dbca";

export default node;
