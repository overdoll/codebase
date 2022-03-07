/**
 * @generated SignedSource<<fb806a856c994dc98122d4b941bc955f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubButtonViewerFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentType": "SupportClubButtonViewerFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "SupportClubButtonViewerFragment";
};
export type SupportClubButtonViewerFragment = SupportClubButtonViewerFragment$data;
export type SupportClubButtonViewerFragment$key = {
  readonly " $data"?: SupportClubButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubButtonViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fed6f01fa072abc609287969295af44f";

export default node;
