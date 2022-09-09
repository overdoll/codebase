/**
 * @generated SignedSource<<96b0b0034f6d0bd6a28b402a8146d93a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostClubLinksFragment$data = {
  readonly links: ReadonlyArray<{
    readonly url: string;
  }>;
  readonly " $fragmentType": "PostClubLinksFragment";
};
export type PostClubLinksFragment$key = {
  readonly " $data"?: PostClubLinksFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostClubLinksFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostClubLinksFragment",
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

(node as any).hash = "a8e1d216df1180bfdeccd25bf801ae4a";

export default node;
