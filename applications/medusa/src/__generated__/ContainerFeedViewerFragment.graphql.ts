/**
 * @generated SignedSource<<43f5927a4e17e80ebf71e33308c1c4ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerFeedViewerFragment$data = {
  readonly clubMembershipsCount: number;
  readonly curationProfile: {
    readonly audience: {
      readonly completed: boolean;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"HeaderFeedViewerFragment" | "ScrollPostsFeedFragment">;
  readonly " $fragmentType": "ContainerFeedViewerFragment";
};
export type ContainerFeedViewerFragment$key = {
  readonly " $data"?: ContainerFeedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerFeedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerFeedViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CurationProfile",
      "kind": "LinkedField",
      "name": "curationProfile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AudienceCurationProfile",
          "kind": "LinkedField",
          "name": "audience",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "completed",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HeaderFeedViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPostsFeedFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "14670498d903d9fb926bfe66ca1a7bc9";

export default node;
