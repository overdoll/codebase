/**
 * @generated SignedSource<<483b94d7607af4a4343d5a193b35dad9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubExternalLinksFragment$data = {
  readonly links: ReadonlyArray<{
    readonly url: string;
  }>;
  readonly " $fragmentType": "ClubExternalLinksFragment";
};
export type ClubExternalLinksFragment$key = {
  readonly " $data"?: ClubExternalLinksFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubExternalLinksFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubExternalLinksFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubLink",
      "kind": "LinkedField",
      "name": "links",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "12d503ecd69ac1c054d43a764bef4a63";

export default node;
